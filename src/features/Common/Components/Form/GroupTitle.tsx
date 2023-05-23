interface FormGroupTitleProps {
  title: string;
}

const FormGroupTitle = ({ title }: FormGroupTitleProps) => {
  return <div className="font-semibold text-teal-500">{title}</div>;
};

export default FormGroupTitle;
