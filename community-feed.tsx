"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import {
  ImageIcon,
  Smile,
  BarChart3,
  Send,
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  MoreHorizontal,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Comment {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  shares: number
  liked?: boolean
  bookmarked?: boolean
}

export function CommunityFeed() {
  const [newPost, setNewPost] = useState("")
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [newComment, setNewComment] = useState("")

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Dra. Ana Silva",
        username: "@anasilva_adv",
        avatar: "/lawyer-scales-justice.png",
      },
      content:
        "Acabei de completar o módulo de Direito Constitucional! A jurisprudência sobre direitos fundamentais é fascinante. Alguém mais estudando essa área?",
      timestamp: "há 2 horas",
      likes: 24,
      comments: [
        {
          id: "c1",
          author: {
            name: "Carlos Mendes",
            username: "@carlosmendes",
            avatar: "/diverse-students-studying.png",
          },
          content: "Também estou estudando! A parte sobre liberdades públicas é incrível.",
          timestamp: "há 1 hora",
          likes: 5,
        },
        {
          id: "c2",
          author: {
            name: "Prof. Roberto Lima",
            username: "@prof_roberto",
            avatar: "/diverse-professor-lecturing.png",
          },
          content: "Recomendo ler a ADI 4277 sobre união homoafetiva. Decisão histórica!",
          timestamp: "há 45 min",
          likes: 12,
        },
      ],
      shares: 3,
      liked: false,
      bookmarked: false,
    },
    {
      id: "2",
      author: {
        name: "Carlos Mendes",
        username: "@carlosmendes",
        avatar: "/diverse-students-studying.png",
      },
      content:
        "Dica do dia: Para memorizar artigos do Código Civil, criei flashcards no LEX GO. Minha produtividade aumentou 200%!",
      timestamp: "há 5 horas",
      likes: 56,
      comments: [
        {
          id: "c3",
          author: {
            name: "Dra. Ana Silva",
            username: "@anasilva_adv",
            avatar: "/lawyer-scales-justice.png",
          },
          content: "Ótima dica! Vou experimentar também.",
          timestamp: "há 3 horas",
          likes: 8,
        },
      ],
      shares: 18,
      liked: true,
      bookmarked: true,
    },
    {
      id: "3",
      author: {
        name: "Prof. Roberto Lima",
        username: "@prof_roberto",
        avatar: "/diverse-professor-lecturing.png",
      },
      content:
        "Nova decisão do STF sobre proteção de dados! Isso vai impactar muito a prática jurídica. Quem já leu a íntegra?",
      timestamp: "há 1 dia",
      likes: 89,
      comments: [],
      shares: 45,
      liked: false,
      bookmarked: false,
    },
  ])

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: "Você",
          username: "@voce",
          avatar: "/abstract-geometric-shapes.png",
        },
        content: newPost,
        timestamp: "agora",
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
        bookmarked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const toggleBookmark = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  const openComments = (postId: string) => {
    setSelectedPost(postId)
    setShowComments(true)
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "Você",
          username: "@voce",
          avatar: "/abstract-geometric-shapes.png",
        },
        content: newComment,
        timestamp: "agora",
        likes: 0,
      }

      setPosts(
        posts.map((post) => (post.id === selectedPost ? { ...post, comments: [...post.comments, comment] } : post)),
      )
      setNewComment("")
    }
  }

  const handleShare = (postId: string) => {
    setSelectedPost(postId)
    setShowShareDialog(true)

    // Increment share count
    setPosts(posts.map((post) => (post.id === postId ? { ...post, shares: post.shares + 1 } : post)))

    // Auto close after 2 seconds
    setTimeout(() => {
      setShowShareDialog(false)
    }, 2000)
  }

  const currentPost = posts.find((p) => p.id === selectedPost)

  return (
    <div className="space-y-4">
      {/* Campo de Nova Postagem */}
      <Card className="p-4 border-2 border-border">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary/20">
            <AvatarImage src="/abstract-geometric-shapes.png" />
            <AvatarFallback className="bg-primary text-white font-bold">U</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Compartilhe seu conhecimento jurídico..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] resize-none border-0 focus-visible:ring-0 text-base"
            />

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                  <BarChart3 className="w-5 h-5" />
                </Button>
              </div>

              <Button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="bg-accent hover:bg-accent/90 text-white gap-2"
              >
                <Send className="w-4 h-4" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Feed de Postagens */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 hover:bg-accent/5 transition-colors border border-border">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-white">{post.author.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{post.author.name}</span>
                      <span className="text-sm text-muted-foreground">{post.author.username}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-foreground leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openComments(post.id)}
                    className="gap-2 text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                    className="gap-2 text-muted-foreground hover:text-green-500"
                  >
                    <Repeat2 className="w-5 h-5" />
                    <span className="text-sm">{post.shares}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`gap-2 ${post.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? "fill-red-500" : ""}`} />
                    <span className="text-sm">{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(post.id)}
                    className={`${post.bookmarked ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.bookmarked ? "fill-accent" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Comentários</DialogTitle>
          </DialogHeader>

          {currentPost && (
            <div className="space-y-4">
              {/* Original Post */}
              <div className="pb-4 border-b border-border">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentPost.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentPost.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{currentPost.author.name}</span>
                      <span className="text-sm text-muted-foreground">{currentPost.author.username}</span>
                    </div>
                    <p className="text-foreground mt-1">{currentPost.content}</p>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {currentPost.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 hover:bg-accent/5 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.author.username}</span>
                        <span className="text-xs text-muted-foreground">· {comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-foreground mt-1">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/abstract-geometric-shapes.png" />
                  <AvatarFallback className="bg-primary text-white">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-accent hover:bg-accent/90 text-white"
                    >
                      Comentar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Repeat2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Post Compartilhado!</h3>
            <p className="text-muted-foreground">O post foi compartilhado com seus seguidores.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
