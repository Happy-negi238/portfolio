import { file, z } from 'zod';

export const validateAdmin = z.object({
  fullName: z
    .string()
    .min(2, 'Full name is required')
    .max(50, 'Full name must be at most 50 characters'),
  email: z
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  password: z.string().length(8, 'Password is required'),
});

export const validateContact = z.object({
  fullName: z
    .string()
    .min(2, 'Full name is required')
    .max(100, 'Full name must be at most 100 characters'),
  email: z
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  phoneNo: z
    .string()
    .max(20, 'Phone number must be at most 20 characters')
    .optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const validateProject = z.object({
  zodName: z
    .string()
    .min(2, 'Project name is required')
    .max(255, 'Project name must be at most 255 characters'),
  zodDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  zodTechStack: z
    .array(z.string())
    .min(1, 'At least one technology is required'),
  zodImage: z
    .instanceof(File)
    .refine((file) => file.name ?? undefined)
    .optional(),
  zodGithubLink: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url('Invalid GitHub URL').max(255).optional()
  ),
  zodDeployLink: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url('Invalid deploy URL').max(255).optional()
  ),
});

export const validateAdminInput = z.object({
  email: z
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  password: z.string().length(8, 'Password is required'),
});

export type Project = {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubLink: string | null;
  deployLink: string | null;
  image: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type validateContactTypes = z.infer<typeof validateContact>;
export type validateAdminTypes = z.infer<typeof validateAdmin>;
export type validateProjectTypes = z.infer<typeof validateProject>;
export type validateAdminInputTypes = z.infer<typeof validateAdminInput>;
