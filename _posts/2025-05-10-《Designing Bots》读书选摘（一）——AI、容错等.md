仅选取感兴趣的部分浏览。英文部分为书中内容，中文部分为后感。

## 第七章 Artificial Intelligence

### P76-77 When to (not) use AI

Not using AI is a very valid option when building a bot. Some use cases do not require AI at all.

Design a great conversation should be orthogonal to the decision to use AI or any other toolset to build your bot.

广义来看，所有人机交互行为都可看成是与bot互动。比如编译过程、脚本运行、搜索网页等等。

## 第八章 The Conversation

### P126 Error Handling

To err is human; to fix the error and get the conversation going again is your responsibility.

在编程工具中，为避免轻易「劝退」而作的交互设计往往不为重视。

#### Course Correction

Course correction relies on the bot's ability to pull the user back into the happy flow of the conversation.

There's another way to handle a request from a user that cannot be fulfilled at the moment, and that is to collect that information and use it to grow your product.

看到这，想起 [之前的设想](https://zhuanlan.zhihu.com/p/260117393)，可考虑在编程工具中提供用户直接提碰到的问题的渠道，让issue提交的门槛尽量低。

> User: Wait, No! I want a cappuccino!
> Coffee-bot: I do not understand your request.

This is what we call "dead end" -- a savvy user will try to reignite the conversation, but most users will get frustrated and abandon the conversation.

类似的，自研编程工具在交互方面对报错信息的不重视会让试用者在几分钟内敬而远之。

#### Human Intervention

Deferring to a human supervisor is a viable and common solution to error handling with bots. This could be transparent to the user,...

In some instances, support like this is an expected pattern -- the bot serves as a first line of defense and the human supervisor steps in to provide assistance in cases where the bot fails.

#### Restarting the Conversation

should be avoided, but is still better than a dead end in many use cases.

#### Redirecting to Another Bot

In the future there might also be a potential revenue stream that can come from bots sending users to each other.

一个bot间通用接口很重要。这个接口不妨借鉴自然语言语法。

#### Keeping it Consistent

A delightful banking bot that is "always happy to help" cannot start spitting "error 524, invalid input" -- that would create dissonance and will antagonize the user.

The character of your bot will shine in edge cases where the bot does not know how to handle the user's requests.

#### Learning from Your Bot's Mistakes

Most bot designers collect these conversations and sort them by how often they happen.

Designing a conversation is an onging process of learning from your bot's mistakes.

your bot should always be "growing and improving" and the bot's design should be continually optimized.

当前大多IDE已集成反馈功能，比如崩溃/报异常时选择提交信息，但多数无法追溯后续跟进。

### P132 Help and Feedback

Requests for help might indicate a broken part of the conversation

#### Soliciting Feedback

(Other than asking directly) ways to gather user feedback in later stages of your bot's conversation:

- Support the "feedback" command
- End a conversation with a request for feedback
- Capture keywords

从互动中猜意图是接近自然但更有挑战的。

【第八章完。待续】