import { type Dispatch, type SubmitEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export type UpdateFormState = {
  id: string;
  projectName: string;
  projectDescription: string;
  projectTechStack: string;
  projectGithubLink: string | undefined;
  projectDeployLink: string | undefined;
  projectImage: File | undefined;
};

interface UpdateFormFieldsProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  formState: UpdateFormState;
  setFormState: Dispatch<React.SetStateAction<UpdateFormState>>;
  currentImage?: string | null;
  onCancel: () => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
}

export default function UpdateFormFields({
  open,
  onOpenChange,
  formState,
  setFormState,
  currentImage,
  onCancel,
  onSubmit,
}: UpdateFormFieldsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Update only the project fields you want to change. The form is
            auto-filled from the selected project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="project-id">Project ID</Label>
            <Input
              id="project-id"
              value={formState.id}
              readOnly
              className="bg-slate-100 text-slate-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              value={formState.projectName}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectName: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-description">Project description</Label>
            <Input
              id="project-description"
              value={formState.projectDescription}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectDescription: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-techstack">Tech stack</Label>
            <Input
              id="project-techstack"
              value={formState.projectTechStack}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectTechStack: event.target.value,
                }))
              }
              placeholder="Separate values with commas"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-github-link">GitHub link</Label>
            <Input
              id="project-github-link"
              value={formState.projectGithubLink}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectGithubLink: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-deploy-link">Deploy link</Label>
            <Input
              id="project-deploy-link"
              value={formState.projectDeployLink}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectDeployLink: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-image">Project image</Label>
            <Input
              id="project-image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  projectImage: event.target.files?.[0] ?? undefined,
                }))
              }
            />
            <p className="text-xs text-slate-500">
              Current image: {currentImage || 'none'}
            </p>
          </div>

          <DialogFooter className="mt-4 gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
