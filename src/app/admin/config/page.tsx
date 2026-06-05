'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { validateAdminTypes } from '@/../validate/validateTypes';
import { insertUser } from '@/../actions/admin';

export default function Config() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setsuccess] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validateAdminTypes>({
    mode: 'onBlur',
  });

  const submit: SubmitHandler<validateAdminTypes> = async (data) => {
    setIsLoading(true);

    const { fullName, email, password } = data;
    const response = await insertUser(fullName, email, password);
    if (!response.success) return setError(response.message);

    setsuccess(response.message);
    setIsLoading(false);

    router.refresh();
  };
  return (
    <div className="max-w-3xl mx-auto ">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
      <div className="rounded-lg border bg-background p-6">
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>
            <input
              type="text"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Full name must be less than 100 characters',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email-id</label>
            <input
                type="email"
              {...register('email', {
                required: 'Email-id is required',
                minLength: {
                  value: 10,
                  message: 'Email-id should be more characters',
                },
                maxLength: {
                  value: 200,
                  message: 'Email-id should be less than 200 characters',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Email-id"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                maxLength: {
                  value: 8,
                  message: 'Password must be 8 characters',
                },
                minLength: {
                  value: 8,
                  message: 'Password must be 8 characters',
                },
              })}
              className="w-full rounded-md border px-3 py-2"
              placeholder="********"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`rounded-md bg-primary px-4 py-2 text-primary-foreground cursor-pointer transition
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'} `}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
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
