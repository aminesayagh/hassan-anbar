import { memo, useState, useCallback, useRef, useEffect } from "react";
import Modal from "@/components/ui/overlay/modal";
import Popover from "@/components/ui/overlay/popover";
import Navbar from "@/components/ui/navbar";
import Logo from "@/components/ui/logo";
import { twMerge } from "tailwind-merge";
import Link from "@/components/ui/typography/Link";
import { gsap, Power3, ScrollTrigger } from "@/utils/gsap";

import useValidGetContentQuery from "@/hook/useValidGetContentQuery";
import { useIsomorphicLayoutEffect } from "react-use";
import Button from "@/components/ui/button/Button";
import { linkStyle, textStyle } from "@/components/ui/typography/Typography.style";

import { buttonUnderlineStyle } from "@/components/ui/button/Button.style";
import { Icon } from "@/components/ui/icon";

const GAP_SIZE_LG = "gap-4 sm:gap-6 xl:gap-8";
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

const LinkUi = ({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return <Link href={href} className={twMerge(linkStyle({
    size: 'sm',
    weight: 'semibold',
    degree: '1'
  }), className)} >
    {children}
  </Link>
}

{/* <div className="relative overflow-hidden group">
      <span className="invisible">Text Glitch</span>
      <span className="text-neutral-400 absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">
        Text Glitch
      </span>
      <span className="text-neutral-400 absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">
        Text Glitch
      </span>
    </div> */}

const LinkGlitch = ({ href, children }: {
  href: string;
  children: React.ReactNode;
}) => {
  return <div className='relative overflow-hidden group' >
    <span className='invisible' >{children}</span>
    <LinkUi href={href} className='absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300' >
      {children}
    </LinkUi>
    <LinkUi href={href} className='absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300' >
      {children}
    </LinkUi>
  </div>
}

const Header = () => {
  let [openMenu, setOpenMenu] = useState<boolean>(false);
  const { data, error, loading } = useValidGetContentQuery();
  const ctx = useRef<any>(null);
  const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));


  const nestMenuItems = useCallback(
    (menuItems: MenuItemNode[]): MenuItemWithChildren[] => {
      return menuItems.reduce((acc, item) => {
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
    },
    []
  );

  // useIsomorphicLayoutEffect(() => {
  //   ctx.current = gsap.context((self) => {});
  //   return () => {
  //     ctx.current.revert();
  //     tl.current.kill();
  //   };
  // }, []);

  const menuHandler = useCallback(() => {
    
  }, []);

  // useEffect(() => {
  //   if (openMenu) {
  //     ctx.current.open();
  //   }
  // }, [openMenu]);


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
  const action = menus?.nodes.find((n) => n.name == "action")?.menuItems.nodes[0];

  const nestedMenu = nestMenuItems(menu as MenuItemNode[]);
  if (!logo || !menu || !action) return null;

  return (
    <Navbar size="lg" className="overflow-hidden">
      <span className="w-full flex flex-row gap-5 xl:gap-8 items-start justify-between">
        <Navbar.Brand>
          <Logo
            src={logo?.sourceUrl}
            alt={logo?.altText}
            href="/"
            width={logo.mediaDetails.width}
            height={logo.mediaDetails.height}
            className='pt-[0.14rem]'
          />
        </Navbar.Brand>
        <Navbar.Content
          className={twMerge(
            "flex-1 flex flex-row justify-start overflow-hidden",
            'hidden mdl:flex',
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
                      className={linkStyle({
                        size: 'sm',
                        weight: 'semibold',
                        degree: '1'
                      })}
                    >
                      <span className="flex flex-row gap-1">
                        {menu.label}
                        <Icon name='IconArrowDown' className="text-content-100 w-4 sm:w-5" />
                      </span>
                    </Link>
                  </Popover.Button>
                  <Popover.Content offset={20}>
                    {({ close }) => (
                      <ul className="flex flex-col bg-primary-100/40 backdrop-blur-xl shadow-lg shadow-black-200/10 py-2 border border-content-200/20 rounded-sm">
                        {menu.children.map((child) => (
                          <li key={child.id} className="px-6 w-full py-3">
                            <Link
                              href={child.url}
                              className={twMerge("w-full", linkStyle({
                                size: 'sm',
                                weight: 'semibold',
                                degree: '1'
                              }))}
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
                  <LinkGlitch href={menu.url} >
                    {menu.label}
                  </LinkGlitch>
                )}
              </Navbar.Item>
            );
          })}
        </Navbar.Content>
        <Navbar.Content>
          <Modal isOpenExternal={openMenu} menuHandler={menuHandler}>
            <Modal.Button className={buttonUnderlineStyle} ><span className="flex flex-row items-center gap-1">{action.label}<Icon name='IconArrowUpRight' className="text-content-100 w-4 sm:w-6" /></span></Modal.Button>
            <Modal.Content>
              {({ handler }) => (
                <div className="flex flex-col gap-4 p-4">
                  fdd
                </div>
              )}
            </Modal.Content>
          </Modal>
        </Navbar.Content>
      </span>
    </Navbar>
  );
};
export default memo(Header);
