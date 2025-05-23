import packageInfo from '../package.json' assert { type: 'json' }
import { argv } from 'node:process'
import { $, minimist } from 'zx'

const args = minimist(argv.slice(2), {
  default: {
    type: 'info',
    title: '成功',
  },
})

async function main() {
  const latestCommit = (await $`git log -1 --pretty=%B`).stdout
  const latestCommitter = (await $`git log -1 --pretty=format:'%an'`).stdout

  fetch(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=33f4bc79-641f-4e53-ba40-3cbcb0f79db5`, {
    method: 'POST',
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: {
        content: `### VSCode 插件<font color="${args.type}">${packageInfo.version}发布${args.title}</font>
> 提交信息：<font color="comment">${latestCommit.replace(/\n/g, '')}</font>
> 提交者：<font color="comment">${latestCommitter}</font>`,
      },
    }),
  })
}

main()
