import z from "zod";

export const signInFormSchema = z.object({
  email: z.email('Invalid email format').min(3, 'Email must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z
      .string()
      .min(3, 'Confirm password must be at least 3 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// 主页配置表单验证
export const homePageConfigSchema = z.object({
  id: z.string().optional(),
  // 视频配置
  videoUrl: z.string().optional().or(z.literal('')).or(z.null()),
  videoTitle: z.string().min(1, '视频标题不能为空').max(100, '视频标题不能超过100个字符').optional().or(z.literal('')).or(z.null()),
  videoPoster: z.string().optional().or(z.literal('')).or(z.null()),
  // 导航栏配置
  navSlogan: z.string().max(200, '标语不能超过200个字符').optional().or(z.literal('')).or(z.null()),
  navLogo: z.string().url('请输入有效的Logo URL').optional().or(z.literal('')).or(z.null()),
  // 个人介绍配置
  personalName: z.string().min(1, '姓名不能为空').max(50, '姓名不能超过50个字符').optional().or(z.literal('')).or(z.null()),
  personalTitle: z.string().max(100, '职位不能超过100个字符').optional().or(z.literal('')).or(z.null()),
  personalBio: z.string().max(500, '个人简介不能超过500个字符').optional().or(z.literal('')).or(z.null()),
  personalAvatar: z.string().url('请输入有效的头像URL').optional().or(z.literal('')).or(z.null()),
  personalLocation: z.string().max(100, '地址不能超过100个字符').optional().or(z.literal('')).or(z.null()),
  personalWebsite: z.string().url('请输入有效的网站URL').optional().or(z.literal('')).or(z.null()),
  personalEmail: z.string().email('请输入有效的邮箱地址').optional().or(z.literal('')).or(z.null()),
  // 社交媒体链接
  githubUrl: z.string().url('请输入有效的GitHub URL').optional().or(z.literal('')).or(z.null()),
  twitterUrl: z.string().url('请输入有效的Twitter URL').optional().or(z.literal('')).or(z.null()),
  linkedinUrl: z.string().url('请输入有效的LinkedIn URL').optional().or(z.literal('')).or(z.null()),
  wechatQr: z.string().url('请输入有效的微信二维码URL').optional().or(z.literal('')).or(z.null()),
  // 卡片信息配置
  cardTitle1: z.string().max(50, '卡片标题不能超过50个字符').optional().or(z.literal('')).or(z.null()),
  cardContent1: z.string().max(200, '卡片内容不能超过200个字符').optional().or(z.literal('')).or(z.null()),
  cardIcon1: z.string().optional().or(z.literal('')).or(z.null()),
  cardLink1: z.string().url('请输入有效的链接URL').optional().or(z.literal('')).or(z.null()),
  cardTitle2: z.string().max(50, '卡片标题不能超过50个字符').optional().or(z.literal('')).or(z.null()),
  cardContent2: z.string().max(200, '卡片内容不能超过200个字符').optional().or(z.literal('')).or(z.null()),
  cardIcon2: z.string().optional().or(z.literal('')).or(z.null()),
  cardLink2: z.string().url('请输入有效的链接URL').optional().or(z.literal('')).or(z.null()),
  cardTitle3: z.string().max(50, '卡片标题不能超过50个字符').optional().or(z.literal('')).or(z.null()),
  cardContent3: z.string().max(200, '卡片内容不能超过200个字符').optional().or(z.literal('')).or(z.null()),
  cardIcon3: z.string().optional().or(z.literal('')).or(z.null()),
  cardLink3: z.string().url('请输入有效的链接URL').optional().or(z.literal('')).or(z.null()),
  // 主题配置
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '请输入有效的颜色值').optional().or(z.literal('')).or(z.null()),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '请输入有效的颜色值').optional().or(z.literal('')).or(z.null()),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '请输入有效的颜色值').optional().or(z.literal('')).or(z.null()),
  // 系统字段
  isActive: z.boolean().optional(),
  configName: z.string().min(1, '配置名称不能为空').max(50, '配置名称不能超过50个字符').optional().or(z.literal('')).or(z.null()),
});