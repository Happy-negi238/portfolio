'use client';

import { useEffect, useState, type SubmitEvent } from 'react';
import {
  getProjects,
  deleteProject,
  updateProject,
} from '@/../actions/project';
import { Trash2, Edit3Icon } from 'lucide-react';
import DeleteConfirmationDialog from './deleteconfirmationdialog';
import UpdateFormFields from './updateformfields';
import { Project } from '@/../validate/validateTypes';

export default function Projectlist() {
  const [state, setState] = useState<Project[] | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  type UpdateFormState = {
    id: string;
    projectName: string;
    projectDescription: string;
    projectTechStack: string;
    projectGithubLink: string | undefined;
    projectDeployLink: string | undefined;
    projectImage: File | undefined;
  };

  const [formState, setFormState] = useState<UpdateFormState>({
    id: '',
    projectName: '',
    projectDescription: '',
    projectTechStack: '',
    projectGithubLink: '',
    projectDeployLink: '',
    projectImage: undefined,
  });

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
  }, [success, error]);

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
      setError('Failed to delete project.');
    }

    closeDeleteModal();
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project);
    setFormState({
      id: project.id,
      projectName: project.name,
      projectDescription: project.description,
      projectTechStack: project.techStack.join(', '),
      projectGithubLink: project.githubLink || '',
      projectDeployLink: project.deployLink || '',
      projectImage: undefined,
    });
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setProjectToEdit(null);
  };

  const handleUpdate = (id: string) => {
    const project = state?.find((item) => item.id === id);
    if (!project) return;
    openEditModal(project);
  };

  const handleUpdateSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const techStackArray = formState.projectTechStack
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    try {
      const response = await updateProject(
        formState.id,
        formState.projectName,
        formState.projectDescription,
        techStackArray,
        formState.projectGithubLink ?? undefined,
        formState.projectDeployLink ?? undefined,
        formState.projectImage
      );

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccess(response.message);
      closeEditModal();
    } catch (error) {
      console.error('Failed to update project:', error);
      setError('Failed to update project.');
    }
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
                        <a href={item.githubLink || "#"} target="_blank">
                          {item.githubLink?.slice(0, 20)}...
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
                        {item.isDeleted ? 'True' : 'False'}
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
                            <Edit3Icon size={18} />
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
            <p className="text-slate-500">No Project listed.</p>
          </div>
        )}
      </div>
      <DeleteConfirmationDialog
        open={Boolean(projectToDelete)}
        projectName={projectToDelete?.name}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />

      <UpdateFormFields
        open={editOpen}
        onOpenChange={(value) => !value && closeEditModal()}
        formState={formState}
        setFormState={setFormState}
        currentImage={projectToEdit?.image}
        onCancel={closeEditModal}
        onSubmit={handleUpdateSubmit}
      />

      {success && <p className="mt-4 text-green-500">{success}</p>}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
