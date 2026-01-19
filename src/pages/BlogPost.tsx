import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep-space mb-4">
          Artículo del Blog
        </h1>
        <p className="text-muted-foreground">ID del artículo: {id}</p>
      </div>

      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Contenido del artículo próximamente disponible.
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
