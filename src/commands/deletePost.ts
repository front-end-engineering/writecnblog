import * as vscode from 'vscode';
import { BlogPostItem, blogPostProvider } from '../blog/blog-post-provider';
import { blogFile } from '../blog/blog-file';
import { blogOperate } from '../blog/blog-operate';

export function deletePostActivate(context: vscode.ExtensionContext) {

    let deletePostDisposable = vscode.commands.registerCommand('writeCnblog.deletePost',
        (blogPostItem: BlogPostItem) => {
            vscode.window
                .showWarningMessage(`是否删除${blogPostItem.label}`, '删除', '取消')
                .then(async selection => {
                    try {
                        if (selection === '删除' && blogPostItem.postBaseInfo) {
                            blogFile.deletePost(blogPostItem.postBaseInfo);
                            let postId = blogPostItem.postBaseInfo.postId;
                            if (postId) {
                                await blogOperate.deletePost(postId, false);
                            }
                        }
                    } catch (error) {
                        vscode.window.showErrorMessage(error.message);
                    } finally {
                        blogPostProvider.refresh();
                    }
                });
        });

    context.subscriptions.push(deletePostDisposable);
}
