
export default function Home() {
  return (
    <section className="mt-10 grid gap-6">
      <div className="card">
        <h1 className="text-3xl font-bold">Welcome to <span className="text-orange-500">TodoPro</span></h1>
        <p className="text-gray-300 mt-2">Manage your tasks in style with TodoPro, designed by Sameer.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Fast Auth</h2>
          <p className="text-gray-400 text-sm">Quick access without compromise on security.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">CRUD Todos</h2>
          <p className="text-gray-400 text-sm">Easily add, edit, mark done, or remove tasks.</p>
        </div>
      </div>
    </section>
  );
}
