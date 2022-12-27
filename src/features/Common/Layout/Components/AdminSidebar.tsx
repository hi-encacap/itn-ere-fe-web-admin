import { useTranslation } from 'react-i18next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FiMapPin, FiUsers } from 'react-icons/fi';
import { HiOutlineMap } from 'react-icons/hi';
import { MdOutlineHomeWork, MdOutlineRealEstateAgent } from 'react-icons/md';
import { TbListDetails, TbMap2 } from 'react-icons/tb';

import { ADMIN_PATH } from '@constants/urls';
import { SidebarItemType } from '@interfaces/Common/commonTypes';

import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarItem from './LayoutSidebarItem';
import LayoutSidebarWebsite from './LayoutSidebarWebsite';

const AdminSidebar = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'layout.sidebar',
  });

  const items: SidebarItemType[] = [
    {
      key: 'dashboard',
      icon: <AiOutlineDashboard size={20} />,
      label: t('dashboard'),
      to: ADMIN_PATH.HOME_PATH,
    },
    {
      key: 'category',
      icon: <BiCategory size={20} />,
      label: t('category'),
      to: ADMIN_PATH.CATEGORY_PATH,
    },
    {
      key: 'contact',
      icon: <FiUsers size={20} />,
      label: t('contact'),
      to: ADMIN_PATH.CONTACT_PATH,
    },
    {
      key: 'estate',
      icon: <MdOutlineHomeWork size={20} />,
      label: t('estate'),
      to: ADMIN_PATH.ESTATE_PATH,
      children: [
        {
          key: 'estate_list',
          icon: <MdOutlineRealEstateAgent size={18} />,
          label: t('estate_list'),
          to: ADMIN_PATH.ESTATE_PATH,
        },
        {
          key: 'estate_property',
          icon: <TbListDetails size={18} />,
          label: t('estate_property'),
          to: ADMIN_PATH.ESTATE_PROPERTY_PATH,
        },
      ],
    },
    {
      key: 'location',
      icon: <HiOutlineMap size={20} />,
      label: t('location'),
      to: ADMIN_PATH.LOCATION_PATH,
      children: [
        {
          key: 'location_province',
          icon: <FiMapPin size={18} />,
          label: t('location_province'),
          to: ADMIN_PATH.LOCATION_PROVINCE_PATH,
        },
        {
          key: 'location_district',
          icon: <FiMapPin size={18} />,
          label: t('location_district'),
          to: ADMIN_PATH.LOCATION_DISTRICT_PATH,
        },
        {
          key: 'location_ward',
          icon: <FiMapPin size={18} />,
          label: t('location_ward'),
          to: ADMIN_PATH.LOCATION_WARD_PATH,
        },
        {
          key: 'location_address_book',
          icon: <TbMap2 size={18} />,
          label: t('location_address_book'),
          to: ADMIN_PATH.LOCATION_ADDRESS_BOOK_PATH,
        },
      ],
    },
  ];

  return (
    <LayoutSidebar>
      <LayoutSidebarWebsite />
      {items.map((item) => (
        <LayoutSidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          childrenItems={item.children}
        />
      ))}
    </LayoutSidebar>
  );
};

export default AdminSidebar;
