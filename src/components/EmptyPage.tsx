type EmptyPageProps = {
  title: string;
  description?: string;
};

const EmptyPage: React.FC<EmptyPageProps> = ({ title, description }) => (
  <div className="text-center mt-24 text-gray-500">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {description && <p className="mt-2">{description}</p>}
  </div>
);

export default EmptyPage;
