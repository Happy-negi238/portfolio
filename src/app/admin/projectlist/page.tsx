'use client';

import { useEffect, useState } from 'react';
import { getProjects, deleteProject, updateProject } from '@/../actions/project';
import { Trash2, Notebook } from 'lucide-react';
import DeleteConfirmationDialog from './deleteconfirmationdialog';

export default function Projectlist() {
  type Project = {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    githubLink: string;
    deployLink: string | null;
    image: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  const [state, setState] = useState<Project[] | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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

  const handleDelete = (id: string) => {
    const project = state?.find((item) => item.id === id);
    if (!project) return;
    setProjectToDelete(project);
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const response = await deleteProject(projectToDelete.id);
      if (!response.success) {
        setError(response.message);
      }

      setSuccess(response.message);
    } catch (error) {
      console.log('Failed to fetch..');
    }

    closeDeleteModal();
  };

  const handleUpdate = (id: string) => {
    console.log('Update value');
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Project list</h1>
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden mt-6">
        {state ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                        uppercase tracking-tight text-slate-500"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                          uppercase tracking-tight text-slate-500"
                    >
                      Description
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                            uppercase tracking-tight text-slate-500"
                    >
                      Github
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                                            uppercase tracking-tight text-slate-500"
                    >
                      Deploy link
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold
                                             uppercase tracking-tight text-slate-500"
                    >
                      Techstack
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                                            uppercase tracking-tight text-slate-500"
                    >
                      Image
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                                            uppercase tracking-tight text-slate-500"
                    >
                      IsDeleted
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold 
                                            uppercase tracking-tight text-slate-500"
                    >
                      Created_at | update_at
                    </th>
                    <th
                      className="px-6 py-4 text-center text-xs font-semibold
                                             uppercase tracking-tight text-slate-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {state.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors border-b "
                    >
                      <td className="px-6 py-3 font-medium text-slate-900 text-sm">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-sm">
                        {item.description.slice(0, 10)}...
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-sm">
                        <a href={item.githubLink} target="_blank">
                          {item.githubLink.slice(0, 20)}...
                        </a>
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        <a href={item.deployLink || '#'} target="_blank">
                          {item.deployLink?.slice(0, 20) || 'Not uploaded'}...
                        </a>
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        {item.techStack.join(',')}
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        {item.image?.slice(0, 10) || 'not uploaded'}...
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        {item.isDeleted}
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        {String(item.createdAt.toLocaleDateString())} |{' '}
                        {String(item.updatedAt.toLocaleDateString())}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleUpdate(item.id)}
                            className="rounded p-2 text-green-500 transition hover:bg-green-100 hover:text-green-600"
                          >
                            <Notebook size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded p-2 text-red-500 transition hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-slate-500">No contact information available.</p>
          </div>
        )}
      </div>
      <DeleteConfirmationDialog
        open={Boolean(projectToDelete)}
        projectName={projectToDelete?.name}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
