'use server';

import fs from 'node:fs/promises';
import path from 'node:path';

import { db } from '@/db/config/db';
import { validateProject } from '../validate/validateTypes';
import { projects } from '@/db/models/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export async function getProjects() {
  try {
    const allProjects = await db.select().from(projects);
    if (!allProjects || allProjects.length === 0) {
      return { success: false, message: 'No projects found' };
    }

    return {
      success: true,
      message: 'Projects fetched successfully',
      data: allProjects,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while fetching projects',
    };
  }
}

export async function insertProject(
  projectName: string,
  projectDescription: string,
  projectTechStack: string[],
  projectGithubLink: string,
  projectDeployLink?: string,
  projectImage?: File
) {
  try {
    const {
      zodName,
      zodDescription,
      zodTechStack,
      zodGithubLink,
      zodDeployLink,
      zodImage,
    } = await validateProject.parseAsync({
      zodName: projectName,
      zodDescription: projectDescription,
      zodTechStack: projectTechStack,
      zodGithubLink: projectGithubLink,
      zodDeployLink: projectDeployLink,
      zodImage: projectImage,
    });

    let imagePath: string | undefined;

    const fileToSave = zodImage instanceof File ? zodImage : zodImage?.[0];

    if (fileToSave) {
      const bytes = await fileToSave.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const extension = fileToSave.name.split('.').pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const uploadDir = path.join(process.cwd(), 'public', 'projects');
      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/projects/${fileName}`;
    }

    const project = await db
      .insert(projects)
      .values({
        name: zodName,
        description: zodDescription,
        techStack: zodTechStack,
        githubLink: zodGithubLink,
        deployLink: zodDeployLink,
        image: imagePath,
      })
      .returning();

    const { id, name, description, techStack, githubLink, deployLink, image } =
      project[0];
    return {
      success: true,
      message: 'Project inserted successfully',
      data: {
        id,
        name,
        description,
        techStack,
        githubLink,
        deployLink,
        image,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while inserting project',
    };
  }
}

export async function updateProject(
  id: string,
  projectName: string,
  projectDescription: string,
  projectTechStack: string[],
  projectGithubLink: string,
  projectDeployLink?: string,
  projectImage?: File
) {
  try {
    if (!id) {
      return { success: false, message: 'Project ID is required' };
    }

    // Find by id
    // get image path and delete the old file upload new one and update data into db

    const {
      zodName,
      zodDescription,
      zodTechStack,
      zodGithubLink,
      zodDeployLink,
      zodImage,
    } = await validateProject.parseAsync({
      zodName: projectName,
      zodDescription: projectDescription,
      zodTechStack: projectTechStack,
      zodGithubLink: projectGithubLink,
      zodDeployLink: projectDeployLink,
      zodImage: projectImage,
    });

    let imagePath: string | undefined;

    const fileToSave = zodImage instanceof File ? zodImage : zodImage?.[0];

    if (fileToSave) {
      const bytes = await fileToSave.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const extension = fileToSave.name.split('.').pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const uploadDir = path.join(process.cwd(), 'public', 'projects');
      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      imagePath = `/projects/${fileName}`;
    }

    const updatedProject = await db
      .update(projects)
      .set({
        name: zodName,
        description: zodDescription,
        techStack: zodTechStack,
        githubLink: zodGithubLink,
        deployLink: zodDeployLink,
        image: imagePath,
      })
      .where(eq(projects.id, id))
      .returning();

    if (!updatedProject || updatedProject.length === 0) {
      return { success: false, message: 'Project not found' };
    }

    return {
      success: true,
      message: 'Project updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating project',
    };
  }
}

export async function getProjectById(projectId: string) {
  try {
    if (!projectId) {
      return { success: false, message: 'Project ID is required' };
    }

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));
    if (!project || project.length === 0) {
      return { success: false, message: 'Project not found' };
    }

    const { id, name, description, techStack, githubLink, deployLink, image } =
      project[0];

    return {
      success: true,
      message: 'Project fetched successfully',
      data: {
        id,
        name,
        description,
        techStack,
        githubLink,
        deployLink,
        image,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while fetching project',
    };
  }
}

export async function deleteProject(projectId: string) {
  try {
    if (!projectId) {
      return { success: false, message: 'Project ID is required' };
    }

    const deleteProject = await db
      .update(projects)
      .set({ isDeleted: true })
      .where(eq(projects.id, projectId))
      .returning();
    if (!deleteProject || deleteProject.length === 0) {
      return {
        success: false,
        message: 'Project not found or already deleted',
      };
    }

    return {
      success: true,
      message: 'Project deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while deleting project',
    };
  }
}
