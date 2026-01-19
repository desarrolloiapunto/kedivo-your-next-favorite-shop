const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep-space mb-4">Blog</h1>
        <p className="text-muted-foreground">
          Artículos y noticias próximamente disponibles.
        </p>
      </div>

      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No hay artículos disponibles en este momento.
        </p>
      </div>
    </div>
  );
};

export default Blog;
