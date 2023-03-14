import { useCallback, useState } from 'react';

import AdminEstateModificationFormDetailDescriptionEditor from './DescriptionEditor';

const AdminEstateModificationFormDetailDescription = () => {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleInitialized = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="mt-6">
      <AdminEstateModificationFormDetailDescriptionEditor
        isFocusing={isFocusing}
        isLoading={isLoading}
        onFocusing={setIsFocusing}
        onInitialized={handleInitialized}
      />
    </div>
  );
};

export default AdminEstateModificationFormDetailDescription;
