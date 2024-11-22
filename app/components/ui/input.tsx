// components/ui/input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<any>;
  label: string;
}

export const Input = ({ icon: Icon, label, ...props }: InputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
        {...props}
      />
    </div>
  </div>
);
