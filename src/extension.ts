import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const legend = new vscode.SemanticTokensLegend(['comment'])

  const selector: vscode.DocumentSelector = { language: 'freemarker' }

  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(
      selector,
      new (class implements vscode.DocumentSemanticTokensProvider {
        provideDocumentSemanticTokens(
          doc: vscode.TextDocument,
        ): vscode.ProviderResult<vscode.SemanticTokens> {
          const builder = new vscode.SemanticTokensBuilder(legend)
          const text = doc.getText()
          const styleBlockRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi

          let match = styleBlockRegex.exec(text)
          while (match !== null) {
            const styleContent = match[1]
            const startOffset = match.index + match[0].indexOf(styleContent)
            const commentRegex = /<#--[\s\S]*?-->/g

            let commentMatch = commentRegex.exec(styleContent)
            while (commentMatch !== null) {
              const offset = startOffset + commentMatch.index
              const start = doc.positionAt(offset)
              const length = commentMatch[0].length
              const tokenTypeIndex = legend.tokenTypes.indexOf('comment')

              if (tokenTypeIndex !== -1) {
                builder.push(start.line, start.character, length, tokenTypeIndex, 0)
              }

              commentMatch = commentRegex.exec(styleContent)
            }

            match = styleBlockRegex.exec(text)
          }

          return builder.build()
        }
      })(),
      legend,
    ),
  )
}
