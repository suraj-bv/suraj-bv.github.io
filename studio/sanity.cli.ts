import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'zipme748',
    dataset: 'production'
  },
  deployment: {
    appId: 'yfxfrn3v2r5f984jtwve1x6l',
    autoUpdates: true,
  },
})
