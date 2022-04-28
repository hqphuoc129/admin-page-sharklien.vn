// assets
import { IconKey } from "@tabler/icons";

// constant
const icons = {
  IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "Admin Pages",
  caption: "Where to update your pages contents",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Admin",
      type: "collapse",
      icon: icons.IconKey,

      children: [
        {
          id: "login3",
          title: "Media",
          url: "/",
          type: "collapse",
          children: [
            {
              id: "register6",
              title: "Videos",
              type: "item",
              url: "/videos",
              breadcrumbs: false,
            },
            {
              id: "register7",
              title: "Images",
              type: "item",
              url: "/images",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "register3",
          title: "News",
          type: "item",
          url: "/news",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default pages;
