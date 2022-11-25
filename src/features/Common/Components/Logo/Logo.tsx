import logo from '../../Assets/Images/encacap_logo.svg';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
}

const Logo = ({ className, imageClassName }: LogoProps) => {
  return (
    <div className={className}>
      <img src={logo} alt="Encacap Logo" className={imageClassName} />
    </div>
  );
};

export default Logo;
