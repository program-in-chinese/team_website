前不久对 [Grace Hopper 1978年的回忆讲演](https://zhuanlan.zhihu.com/p/163808250)颇有共鸣，于是买了《Grace Hopper and the Invention of the Information Age》一书继续探究她的历程。做些摘记，看的随意，并非从头开始。

第十一章，278 页。说到 1953 和 1954 年，她领导了美国计算机协会的术语委员会（ACM's Nomenclature Committee）起草第一份完整的计算机术语表。

> the position gave Hopper an opportunity to define a common language for the industry as a whole

这实际上是为当时美国整个计算机行业的交流尽量标准化以扫清障碍。书中的评价是：

> A common language serves a variety of purposes. One the most basic level, it identifies and defines important terms and concepts within the community of practitioners. These terms and concepts locate the broad intellectual boundaries of the profession and magnify the subtle details within the landscape.

术语一致的重要性对于一个行业来说至关重要。早先 github 组里也有过对[计算机术语中文化的讨论](https://github.com/program-in-chinese/overview/issues/54)，似乎还没有发现比较完整的中文术语词典。刚搜了一下这个 ACM 的术语表似乎也没有当代的版本，不知是否废弃了。

有意思的是 Hopper 在 50 年代小结术语时，将术语尽量远离了“神奇大脑”的范畴：

> Hopper attempted to move the community away from "words of the ***magic brain*** class". ... in the 1940s ... Norbert Wiener and John von Neumann tended to describe computers as "giant brains" and applied descriptive language that perpetuated this metaphoe. Hopper purged these words from computing in the 1950s, replacing "memory" with "storage" and "thinking" with "processing"

也许是想将计算机术语尽量与现实的业务相联系？毕竟，相对于“记忆”和“思考”，“存储”和“处理”是商业中更为熟悉的术语，而且可以加强“计算机是工具”的印象，而不会让新手有“计算机有类人智能”的错误感觉。

此书作者阐述了基于术语的共同语言的更深层意义：

> On a deeper level, a common language helps forge a sense of identity among members of the profession. It facilitates coordination of effort, defines roles, and sustains a feeling of cultural kinship.

就像相声的“黑话”，每个行业的“圈子文化”很大程度上是基于术语的。看一个人是不是圈子里的人，几句专业交流就了然。如果圈子里交流用的术语是英文的，命名时用到术语时一般也会沿用英文。从这个角度说，尽早小结并推广编程用的中文术语会促进中文命名的推广。鉴于标识符命名往往沿用 API 命名的风格，在 API 中文化的过程中进行术语小结与一致化看来是个好途径。

接下去说到，相比性别支配之争，Hopper 更关注避免的是技术方面的偏见：

> Hopper was less concerned with gender dominance than with other types of bias built into the language. She readily admitted that the 1954 glossary was UNIVAC oriented and feared that others would reject it out of hand. ... By broadening participation during the development phase, Hopper increased the odds that the computing community would freely adopt the resultant language.

1954 年时，术语还会依赖于特定硬件。在软件相对独立的现在，在编程领域，也许更需要考虑的是如何在多如牛毛的编程语言之间找到一套共通的中文术语体系，以尽量减少不同编程语言的用户间交流的障碍。从一套各个编程语言都常用的 API 入手进行中文化是个可能途径，这可以作为之前[ API 中文化策略](https://zhuanlan.zhihu.com/p/93495675)的补充。
