'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { validateProjectTypes } from '@/../validate/validateTypes';
import { insertProject } from '@/../actions/project';

export default function projects() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setsuccess] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validateProjectTypes>({
    mode: 'onBlur',
  });

  const submit: SubmitHandler<validateProjectTypes> = async (data) => {
    setIsLoading(true);

    const {
      zodName,
      zodDescription,
      zodTechStack,
      zodImage,
      zodGithubLink,
      zodDeployLink,
    } = data;

    // Need to fix
    const imageFile = (zodImage as any)?.[0];

    const response = await insertProject(
      zodName,
      zodDescription,
      zodTechStack,
      zodGithubLink ?? '',
      zodDeployLink ?? '',
      imageFile
    );

    if (!response.success) return setError(response.message);

    setsuccess(response.message);
    setIsLoading(false);

    router.refresh();
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <h1 className="text-2xl font-semibold mb-6">Add Project</h1>
      <div className="rounded-lg border bg-background p-6">
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Name
            </label>
            <input
              type="text"
              {...register('zodName', {
                required: 'Project name is required',
                minLength: {
                  value: 2,
                  message: 'Project name must be at least 2 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Project name must be less than 100 characters',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Portfolio Website"
            />
            {errors.zodName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              rows={5}
              {...register('zodDescription', {
                required: 'Project description is required',
                minLength: {
                  value: 10,
                  message: 'Project description must be at least 10 characters',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Describe your project..."
            />
            {errors.zodDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tech Stack</label>
            <input
              type="text"
              {...register('zodTechStack', {
                required: 'Tech stack is required',
                setValueAs: (value: string) =>
                  value
                    ? value
                        .split(',')
                        .map((item) => item.trim())
                        .filter((item) => item !== '')
                    : [],
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="React, Next.js, TypeScript, Tailwind CSS"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Separate technologies with commas.
            </p>
            {errors.zodTechStack && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodTechStack.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              GitHub Link
            </label>
            <input
              type="url"
              {...register('zodGithubLink', {
                pattern: {
                  value:
                    /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
                  message: 'Invalid GitHub URL format',
                },
                
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="https://github.com/username/project"
            />
            {errors.zodGithubLink && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodGithubLink.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Deploy Link
            </label>
            <input
              type="url"
              {...register('zodDeployLink', {
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: 'Invalid deploy URL format',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="https://project.vercel.app"
            />
            {errors.zodDeployLink && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodDeployLink.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Image
            </label>
            <input
              type="file"
              accept="image/*"
              // {...register('zodImage', {
              //   required: 'Project image is required',
              // })}
              className="w-full rounded-md border px-3 py-2"
            />
            {errors.zodImage?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zodImage.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`rounded-md bg-primary px-4 py-2 text-primary-foreground cursor-pointer transition
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'} `}
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>

      {success && (
        <p className="mt-4 text-green-500 px-4 py-2 border border-green-300 bg-green-400/50]:">
          {success}
        </p>
      )}
      {error && (
        <p className="mt-4 text-red-500 px-4 py-2 border border-red-300 bg-red-400/50">
          {error}
        </p>
      )}
    </div>
  );
}
