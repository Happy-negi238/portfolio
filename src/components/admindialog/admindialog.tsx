import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { validateAdminInputTypes } from '@/../validate/validateTypes';

export const AdminDialog = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validateAdminInputTypes>({
    mode: 'onBlur',
  });

  const submit: SubmitHandler<validateAdminInputTypes> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className={cn('text-white', className)}>Admin</button>
        </DialogTrigger>

        <DialogContent className="bg-neutral-700/40 text-white backdrop-blur-lg p-9">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-5">Recognize Admin</DialogTitle>
          </DialogHeader>

          <div className="rounded-xl">
            <form className="space-y-5" onSubmit={handleSubmit(submit)}>
              <div className="space-y-2">
                <label className="text-md text-neutral-100 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                  className="
                                        w-full
                                        rounded-lg
                                        border border-neutral-500
                                        border-dashed
                                        px-4 py-3
                                        text-white
                                        outline-none
                                        transition-colors
                                        focus:border-neutral-400
                                        placeholder:text-white/60
                                    "
                />
                {errors.email?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-md text-neutral-100 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be 8 characters',
                    },
                    maxLength: {
                      value: 8,
                      message: 'Password must be 8 characters',
                    },
                  })}
                  className="
                                        w-full
                                        rounded-lg
                                        border border-neutral-500
                                        px-4 py-3
                                        text-white
                                        placeholder:text-white/60
                                        border-dashed
                                        outline-none
                                        transition-colors
                                        focus:border-neutral-400
                                    "
                />
                {errors.password?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="
                                    w-full
                                    rounded-lg
                                    border border-neutral-800
                                    bg-white
                                    py-3
                                    font-medium
                                    text-black
                                    transition-all
                                    hover:bg-neutral-200
                                    cursor-pointer
                                    "
              >
                Verify Admin
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
