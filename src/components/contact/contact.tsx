'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateContactTypes } from '../../../validate/validateTypes';
import { InsertContact } from '@/../actions/contact';

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setsuccess] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validateContactTypes>({
    mode: 'onBlur',
  });

  const submit: SubmitHandler<validateContactTypes> = async (data) => {
    setIsLoading(true);
    const { fullName, email, phoneNo, message } = data;
    const response = await InsertContact(
      fullName,
      email,
      phoneNo || '',
      message
    );

    if (!response.success) {
      setError(response.message);
    }

    setsuccess(response.message);
    setIsLoading(false);
  };

  return (
    <section className="w-full">
      <div className="border-y border-neutral-800 border-dashed px-10 py-10">
        <div className="mb-10">
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Contact Me</h2>

          <p className="mt-4 max-w-2xl text-neutral-400">
            Have a project in mind, a job opportunity, or just want to say
            hello? Fill out the form below and I'll get back to you as soon as
            possible.
          </p>
        </div>

        <form className="max-w-3xl space-y-6" onSubmit={handleSubmit(submit)}>
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm text-neutral-300"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Full name has too many characters',
                },
              })}
              className="w-full rounded-xl border border-neutral-800
               bg-neutral-950 px-4 py-3 outline-none transition focus:border-neutral-600"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-neutral-300"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
                maxLength: {
                  value: 255,
                  message: 'Email has too many characters',
                },
              })}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 outline-none transition focus:border-neutral-600"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm text-neutral-300"
            >
              Phone Number <span className="text-neutral-500">(Optional)</span>
            </label>

            <input
              id="phone"
              type="number"
              placeholder="+91 98765 43210"
              {...register('phoneNo', {
                maxLength: {
                  value: 20,
                  message: 'Phone number has too many characters',
                },
              })}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 
              px-4 py-3 outline-none transition focus:border-neutral-600
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.phoneNo && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-neutral-300"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={6}
              placeholder="Tell me about your project..."
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
                maxLength: {
                  value: 250,
                  message: 'Message must be at most 250 characters',
                },
              })}
              className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 outline-none transition focus:border-neutral-600"
            />
            {errors.message?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-md cursor-pointer border border-white bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {success && <p className="mt-4 text-green-500">{success}</p>}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </section>
  );
};
