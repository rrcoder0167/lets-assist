import { authOptions } from '../api/auth/[...nextauth]/route';
import CreateProjectForm from '@/components/CreateProjectForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CreateProject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <h1>Create a Project</h1>
      <CreateProjectForm />
    </>
  );
}