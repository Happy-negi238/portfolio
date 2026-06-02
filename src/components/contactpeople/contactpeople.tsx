'use client';

import { useEffect, useState } from 'react';
import { GetContacts } from '@/../actions/contact';
import { validateContactTypes } from '@/../validate/validateTypes';
import { Trash2 } from 'lucide-react';

export const ContactPeople = () => {
  const [state, setState] = useState<validateContactTypes[] | null>(null);

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await GetContacts();
        if (
          !response.success ||
          !response.data ||
          Object.keys(response.data).length === 0
        ) {
          console.error('No contact information found');
          return;
        }

        setState(
          response.data.map((contact) => ({
            ...contact,
            phoneNo: contact.phoneNo ?? undefined,
          }))
        );
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    }

    fetchContactInfo();
  }, []);

  const handleDelete = () => {
    console.log('Delete contact information');
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Peples who reached to you</h1>
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden mt-6">
        {state ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Message
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {state.map((contact) => (
                    <tr
                      key={contact.email}
                      className="hover:bg-slate-50 transition-colors border-b "
                    >
                      <td className="px-6 py-3 font-medium text-slate-900 text-sm">
                        {contact.fullName}
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-sm">
                        {contact.email}
                      </td>
                      <td className="px-6 py-3 text-slate-600 text-sm">
                        {contact.phoneNo}
                      </td>
                      <td className="max-w-sm px-6 py-3 text-slate-600 text-sm">
                        <p className="line-clamp-2">{contact.message}</p>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center">
                          <button
                            onClick={handleDelete}
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
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
    </div>
  );
};
