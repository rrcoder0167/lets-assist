import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CreateProject() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login')
  }
  console.log(session);

  return (
    <>
      <h1>Create a Project</h1>
      <form>
        <div className="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Project Title
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />

          <label for="exampleFormControlTextarea1" class="form-label">
            Project Description
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>

          <label for="exampleFormControlInput1" class="form-label">
            Date & Time
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />

          <label for="exampleFormControlInput1" class="form-label">
            Location
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <label for="customRange1" class="form-label">
          About how many people do you want?
        </label>
        <input type="range" className="form-range" id="customRange1" />
        <button className="btn btn-primary">Create Project</button>
        <div className="error">Error Message</div>
      </form>
    </>
  );
}
