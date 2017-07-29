// Ignite CLI plugin for ReduxThunk
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'redux-thunk'
const patches = require('./patches')

// const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()


const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME)

  await ignite.patchInFile(`${APP_PATH}/App/Redux/CreateStore.js`, {
    insert: patches.import,
    after: `from 'redux'`
  })

  await ignite.patchInFile(`${APP_PATH}/App/Redux/CreateStore.js`, {
    insert: patches.middleware,
    before: `Assemble Middleware`
  })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, patching } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: false })

  await ignite.patchInFile(`${APP_PATH}/App/Redux/CreateStore.js`, {delete: patches.import})
  await ignite.patchInFile(`${APP_PATH}/App/Redux/CreateStore.js`, {delete: patches.middleware1})
  await ignite.patchInFile(`${APP_PATH}/App/Redux/CreateStore.js`, {delete: patches.middleware2})
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

