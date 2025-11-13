"use client"

export interface Course {
  id: string
  title: string
  description: string
  subjects: Subject[]
  totalXP: number
  isLocked: boolean
}

export interface Subject {
  id: string
  courseId: string
  title: string
  nodes: LessonNode[]
  progress: number
  isLocked: boolean
}

export interface LessonNode {
  id: string
  type: "lesson" | "quiz" | "terms" | "jurisprudence" | "hearing" | "exam"
  title: string
  xp: number
  isCompleted: boolean
  isLocked: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
  isUnlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  likes: number
  comments: Comment[]
  shares: number
  createdAt: string
  isLiked?: boolean
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  createdAt: string
}

// Database service com localStorage
export const db = {
  // Cursos
  getCourses: (): Course[] => {
    if (typeof window === "undefined") return []
    const coursesStr = localStorage.getItem("lexgo_courses")
    return coursesStr ? JSON.parse(coursesStr) : getDefaultCourses()
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem("lexgo_courses", JSON.stringify(courses))
  },

  updateLessonProgress: (lessonId: string, xpEarned: number) => {
    const courses = db.getCourses()
    let updated = false

    courses.forEach((course) => {
      course.subjects.forEach((subject) => {
        const lesson = subject.nodes.find((n) => n.id === lessonId)
        if (lesson) {
          lesson.isCompleted = true
          updated = true
        }
      })
    })

    if (updated) {
      db.saveCourses(courses)
    }
  },

  // Conquistas
  getAchievements: (): Achievement[] => {
    if (typeof window === "undefined") return []
    const achievementsStr = localStorage.getItem("lexgo_achievements")
    return achievementsStr ? JSON.parse(achievementsStr) : getDefaultAchievements()
  },

  unlockAchievement: (achievementId: string) => {
    const achievements = db.getAchievements()
    const achievement = achievements.find((a) => a.id === achievementId)

    if (achievement && !achievement.isUnlocked) {
      achievement.isUnlocked = true
      achievement.unlockedAt = new Date().toISOString()
      localStorage.setItem("lexgo_achievements", JSON.stringify(achievements))
      return achievement
    }
    return null
  },

  // Posts da comunidade
  getPosts: (): Post[] => {
    if (typeof window === "undefined") return []
    const postsStr = localStorage.getItem("lexgo_posts")
    return postsStr ? JSON.parse(postsStr) : []
  },

  addPost: (content: string, authorId: string, authorName: string) => {
    const posts = db.getPosts()
    const newPost: Post = {
      id: "post_" + Date.now(),
      authorId,
      authorName,
      content,
      likes: 0,
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
    }
    posts.unshift(newPost)
    localStorage.setItem("lexgo_posts", JSON.stringify(posts))
    return newPost
  },

  addComment: (postId: string, content: string, authorId: string, authorName: string) => {
    const posts = db.getPosts()
    const post = posts.find((p) => p.id === postId)

    if (post) {
      const comment: Comment = {
        id: "comment_" + Date.now(),
        postId,
        authorId,
        authorName,
        content,
        createdAt: new Date().toISOString(),
      }
      post.comments.push(comment)
      localStorage.setItem("lexgo_posts", JSON.stringify(posts))
      return comment
    }
    return null
  },

  likePost: (postId: string) => {
    const posts = db.getPosts()
    const post = posts.find((p) => p.id === postId)

    if (post) {
      post.likes += 1
      post.isLiked = true
      localStorage.setItem("lexgo_posts", JSON.stringify(posts))
    }
  },
}

function getDefaultCourses(): Course[] {
  return [
    {
      id: "civil",
      title: "Direito Civil",
      description: "Fundamentos do Direito Civil Brasileiro",
      totalXP: 5000,
      isLocked: false,
      subjects: [],
    },
    {
      id: "penal",
      title: "Direito Penal",
      description: "Introdução ao Direito Penal",
      totalXP: 4500,
      isLocked: true,
      subjects: [],
    },
  ]
}

function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: "first_lesson",
      title: "Primeira Lição",
      description: "Complete sua primeira lição",
      icon: "📚",
      points: 10,
      rarity: "common",
      category: "Estudo",
      isUnlocked: false,
    },
    {
      id: "first_post",
      title: "Primeira Publicação",
      description: "Faça seu primeiro post na comunidade",
      icon: "✍️",
      points: 10,
      rarity: "common",
      category: "Comunidade",
      isUnlocked: false,
    },
  ]
}
