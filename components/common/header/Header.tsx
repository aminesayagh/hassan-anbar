import { memo, useState } from "react";
import Modal from "@/components/ui/overlay/modal";
import Popover from "@/components/ui/overlay/popover";
import Navbar from "@/components/ui/navbar";
import Logo from "@/components/ui/logo";
import { twMerge } from "tailwind-merge";
import Link from "@/components/ui/typography/Link";

import useValidGetContentQuery from "@/hook/useValidGetContentQuery";

const GAP_SIZE_LG = "gap-4 sm:gap-6 lg:gap-7 xl:gap-8";
interface MenuItemNode {
  id: string;
  label: string;
  url: string;
  childItems?: {
    nodes: MenuItemNode[];
  };
  parentId: string | null;
  menuId?: string;
}

interface MenuNode {
  nodes: MenuItemNode[];
}

interface MenuItemWithChildren extends Omit<MenuItemNode, "childItems"> {
  children: MenuItemWithChildren[];
}

const Header = () => {
  const { data, error, loading } = useValidGetContentQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  const { media, menus } = data;
  const logo = media?.nodes.find((n) => n.id == "cG9zdDoyNg==");
  const menu = menus?.nodes.find((n) => n.name == "main")?.menuItems.nodes;

  function nestMenuItems(menuItems: MenuItemNode[]): MenuItemWithChildren[] {
    const nestedMenu = menuItems.reduce((acc, item) => {
      if (!item.parentId) {
        acc.push({ ...item, children: [] });
        return acc;
      }
      const parentIndex = acc.findIndex((i) => i.id === item.parentId);
      if (parentIndex === -1) {
        // @ts-ignore
        acc.push({ id: item.parentId, label: "", url: "", children: [item] });
      } else {
        acc[parentIndex].children.push({ ...item, children: [] });
      }
      return acc;
    }, [] as MenuItemWithChildren[]);
    return nestedMenu;
  }
  if (!logo || !menu) return null;
  const nestedMenu = nestMenuItems(menu);
  return (
    <Navbar size="lg" className="overflow-hidden">
      <span className="w-full flex flex-row gap-8 items-center justify-between">
        <Navbar.Brand>
          <Logo
            src={logo?.sourceUrl}
            alt={logo?.altText}
            href="/"
            width={logo.mediaDetails.width}
            height={logo.mediaDetails.height}
          />
        </Navbar.Brand>
        <Navbar.Content
          className={twMerge(
            "flex-1 flex flex-row justify-start overflow-hidden",
            GAP_SIZE_LG
          )}
        >
          {nestedMenu.map((menu, index) => {
            if (menu.children.length > 0) {
              return (
                <Popover key={index}>
                  <Popover.Button className="outline-none">
                    <Link
                      href={menu.url}
                      size="sm"
                      weight="semibold"
                      degree="2"
                    >
                      {menu.label}
                    </Link>
                  </Popover.Button>
                  <Popover.Content offset={20}>
                    {({ close }) => (
                      <ul className="flex flex-col bg-primary-100/40 backdrop-blur-xl py-2 border border-content-200/20 rounded-sm">
                        {menu.children.map((child) => (
                          <li key={child.id} className="px-4 w-full py-3">
                            <Link
                              href={child.url}
                              size="sm"
                              weight="semibold"
                              degree="2"
                              className="w-full"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Popover.Content>
                </Popover>
              );
            }
            return (
              <Navbar.Item href={menu.url} key={menu.id}>
                {({ isActive, handlerActiveItem }) => (
                  <Link href={menu.url} size="sm" weight="semibold" degree="2">
                    {menu.label}
                  </Link>
                )}
              </Navbar.Item>
            );
          })}
        </Navbar.Content>
      </span>
    </Navbar>
  );
};
export default memo(Header);
