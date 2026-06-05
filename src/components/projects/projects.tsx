'use client';
import { useState, useEffect } from 'react';

import { Project } from '@/../validate/validateTypes';
import { getProjects } from '@/../actions/project';
import Link from 'next/link';
import { GitBranch, Globe } from 'lucide-react';

getProjects;
export const Projects = () => {
  const [state, setState] = useState<Project[] | null>(null);

  useEffect(() => {
    async function fetchProjectInfo() {
      try {
        const response = await getProjects();
        if (
          !response.success ||
          !response.data ||
          Object.keys(response.data).length === 0
        ) {
          console.error('No contact information found');
          return;
        }

        setState(response.data);
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    }

    fetchProjectInfo();
  }, []);

  return (
    <section className="w-full">
      <div className="border-y border-neutral-800 border-dashed px-10 py-10">
        <div className="mb-10">
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl text-neutral-400">
            A collection of projects focused on full-stack development,
            real-time applications, APIs, and modern web experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {state &&
            state.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-neutral-800 p-1"
              >
                <div className="h-full rounded-xl bg-neutral-950 p-6 transition-all hover:border-neutral-800 hover:bg-neutral-900">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-semibold text-neutral-200">
                      {project.name}
                    </h3>

                    <div className="flex gap-2">
                      <Link
                        href={project.githubLink ? project.githubLink : '#'}
                        target="_blank"
                        aria-label="github link"
                        className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-neutral-300 
                        transition-all duration-100 font-extralight text-xs hover:border-neutral-600"
                      >
                        <GitBranch size={20} />
                      </Link>

                      <Link
                        href={project.deployLink ? project.deployLink : '#'}
                        target="_blank"
                        aria-label="deploy link"
                        className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-neutral-300 
                        transition-all duration-100 font-extralight text-xs hover:border-neutral-600"
                      >
                        <Globe size={20} />
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-5">
                    {project.techStack.map((item) => (
                      <div
                        key={item}
                        className="bg-neutral-400/20  rounded-sm text-neutral-300 font-light
                        border border-neutral-600 border-dashed shadow-[inset_0_0_4px_0_rgba(255,255,255,0.1)]
                        backdrop-blur-sm text-sm pl-2 pr-2 py-1"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
