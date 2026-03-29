#!/usr/bin/env node
/**
 * aiox-scanner.cjs — Scans the AIOX project structure and outputs a JSON registry.
 * Usage: node scripts/aiox-scanner.cjs [--scope=all] [--output=pretty]
 */
'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const AIOX_ROOT = path.resolve(__dirname, '..')
const SQUADS_DIR = path.join(AIOX_ROOT, 'squads')
const CORE_DIR = path.join(AIOX_ROOT, '.aiox-core')
const REGISTRY_DIR = path.join(AIOX_ROOT, '.aiox', 'registry')

// Parse args
const args = process.argv.slice(2)
const scope = (args.find(a => a.startsWith('--scope=')) || '--scope=all').split('=')[1]
const pretty = args.includes('--output=pretty')

function readYaml(filePath) {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return null
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return null
  }
}

function scanAgentsDir(agentsDir, squadName) {
  const agents = []
  if (!fs.existsSync(agentsDir)) return agents

  const files = fs.readdirSync(agentsDir)
  for (const file of files) {
    const filePath = path.join(agentsDir, file)
    if (file.endsWith('.md')) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const roleMatch = content.match(/\*\*Role\*\*[:\s]*(.+)/i) || content.match(/\*\*Papel\*\*[:\s]*(.+)/i)
        agents.push({
          id: file.replace('.md', ''),
          name: titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : file.replace('.md', ''),
          file: `squads/${squadName}/agents/${file}`,
          squad: squadName,
          role: roleMatch ? roleMatch[1].trim() : '',
          type: 'agent',
        })
      } catch { /* skip */ }
    } else if (file.endsWith('.yaml') || file.endsWith('.yml')) {
      const data = readYaml(filePath)
      if (data) {
        agents.push({
          id: data.id || file.replace(/\.(yaml|yml)$/, ''),
          name: data.name || data.display_name || file.replace(/\.(yaml|yml)$/, ''),
          file: `squads/${squadName}/agents/${file}`,
          squad: squadName,
          role: data.role || data.purpose || '',
          type: 'agent',
        })
      }
    }
  }
  return agents
}

function scanTasksDir(tasksDir, squadName) {
  const tasks = []
  if (!fs.existsSync(tasksDir)) return tasks

  const files = fs.readdirSync(tasksDir)
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.yaml') && !file.endsWith('.yml')) continue
    const filePath = path.join(tasksDir, file)

    if (file.endsWith('.md')) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const titleMatch = content.match(/^#\s+(.+)$/m)
        tasks.push({
          id: file.replace('.md', ''),
          name: titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : file.replace('.md', ''),
          file: `squads/${squadName}/tasks/${file}`,
          squad: squadName,
          type: 'task',
        })
      } catch { /* skip */ }
    } else {
      const data = readYaml(filePath)
      if (data) {
        tasks.push({
          id: data.id || file.replace(/\.(yaml|yml)$/, ''),
          name: data.name || file.replace(/\.(yaml|yml)$/, ''),
          file: `squads/${squadName}/tasks/${file}`,
          squad: squadName,
          type: 'task',
        })
      }
    }
  }
  return tasks
}

function scanWorkflowsDir(wfDir, squadName) {
  const workflows = []
  if (!fs.existsSync(wfDir)) return workflows

  const files = fs.readdirSync(wfDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
  for (const file of files) {
    const data = readYaml(path.join(wfDir, file))
    if (data) {
      const wf = data.workflow || data
      workflows.push({
        id: wf.id || file.replace(/\.(yaml|yml)$/, ''),
        name: wf.name || file.replace(/\.(yaml|yml)$/, ''),
        file: `squads/${squadName}/workflows/${file}`,
        squad: squadName,
        trigger: wf.trigger || null,
        phases: wf.phases ? wf.phases.length : 0,
        type: 'workflow',
      })
    }
  }
  return workflows
}

function scanSquads() {
  const squads = []
  if (!fs.existsSync(SQUADS_DIR)) return squads

  const dirs = fs.readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))

  for (const dir of dirs) {
    const squadDir = path.join(SQUADS_DIR, dir.name)
    const configPath = path.join(squadDir, 'config.yaml')
    const config = fs.existsSync(configPath) ? readYaml(configPath) : null

    const agents = scanAgentsDir(path.join(squadDir, 'agents'), dir.name)
    const tasks = scanTasksDir(path.join(squadDir, 'tasks'), dir.name)
    const workflows = scanWorkflowsDir(path.join(squadDir, 'workflows'), dir.name)

    const squadData = config?.squad || {}
    squads.push({
      id: squadData.name || dir.name,
      name: squadData.display_name || dir.name,
      version: squadData.version || '0.0.0',
      domain: squadData.domain || '',
      description: squadData.description || '',
      entry_agent: squadData.entry_agent || null,
      agents,
      tasks,
      workflows,
      tiers: config?.tiers || {},
    })
  }
  return squads
}

function scanConstitution() {
  const cPath = path.join(CORE_DIR, 'constitution.md')
  if (!fs.existsSync(cPath)) return null
  try {
    const content = fs.readFileSync(cPath, 'utf-8')
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const versionMatch = content.match(/Version[:\s]*([^\s|]+)/i)
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Constitution',
      version: versionMatch ? versionMatch[1].trim() : '1.0.0',
      path: '.aiox-core/constitution.md',
    }
  } catch {
    return null
  }
}

function scanWorkspace() {
  const coreConfig = readYaml(path.join(CORE_DIR, 'core-config.yaml'))
  return {
    project: coreConfig?.project || {},
    mcp: coreConfig?.mcp || {},
  }
}

// Main scan
const squads = scanSquads()
const allAgents = squads.flatMap(s => s.agents)
const allTasks = squads.flatMap(s => s.tasks)
const allWorkflows = squads.flatMap(s => s.workflows)
const constitution = scanConstitution()
const workspace = scanWorkspace()

const result = {
  meta: {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    scope,
  },
  stats: {
    core: {
      agents: allAgents.length,
      tasks: allTasks.length,
      workflows: allWorkflows.length,
    },
    squads: squads.map(s => ({
      id: s.id,
      agents: s.agents.length,
      tasks: s.tasks.length,
      workflows: s.workflows.length,
    })),
  },
  constitution,
  agents: allAgents,
  tasks: allTasks,
  workflows: allWorkflows,
  workflowChains: [],
  squads: squads.map(s => ({
    id: s.id,
    name: s.name,
    version: s.version,
    domain: s.domain,
    description: s.description,
    entry_agent: s.entry_agent,
    agentCount: s.agents.length,
    taskCount: s.tasks.length,
    workflowCount: s.workflows.length,
    tiers: s.tiers,
  })),
  commands: [],
  workspace,
}

// Write registry files to .aiox/registry/
if (!fs.existsSync(REGISTRY_DIR)) {
  fs.mkdirSync(REGISTRY_DIR, { recursive: true })
}

// index.json
fs.writeFileSync(path.join(REGISTRY_DIR, 'index.json'), JSON.stringify({
  stats: result.stats,
  meta: result.meta,
  generatedAt: result.meta.generatedAt,
  files: {
    core: 'core.json',
    commands: 'commands.json',
    workspace: 'workspace.json',
    squads: squads.map(s => `squad-${s.id}.json`),
  },
}, null, 2))

// core.json
fs.writeFileSync(path.join(REGISTRY_DIR, 'core.json'), JSON.stringify({
  constitution: result.constitution,
  agents: result.agents,
  tasks: result.tasks,
  workflows: result.workflows,
  workflowChains: result.workflowChains,
}, null, 2))

// commands.json
fs.writeFileSync(path.join(REGISTRY_DIR, 'commands.json'), JSON.stringify(result.commands, null, 2))

// workspace.json
fs.writeFileSync(path.join(REGISTRY_DIR, 'workspace.json'), JSON.stringify(result.workspace, null, 2))

// squad-*.json
for (const squad of squads) {
  fs.writeFileSync(
    path.join(REGISTRY_DIR, `squad-${squad.id}.json`),
    JSON.stringify(squad, null, 2)
  )
}

// Output to stdout
const output = pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result)
process.stdout.write(output)
