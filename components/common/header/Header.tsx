import { memo, useState } from "react";
import Modal from "@/components/ui/overlay/modal";
import Navbar from "@/components/ui/navbar";
import Logo from "@/components/ui/logo";
import { twMerge } from "tailwind-merge";
import Link from "@/components/ui/typography/Link";
import { ValidGetContentQuery } from "@/hook/useValidGetContentQuery";

const GAP_SIZE_LG = "gap-4 sm:gap-6 lg:gap-7 xl:gap-8";

const Header = () => {
  return (
    <ValidGetContentQuery>
      {({ media, menus }) => {
        const logo = media?.nodes.find((n) => n.id == "cG9zdDoyNg==");
        const menu = menus?.nodes.find((n) => n.name == "main")?.menuItems
          .nodes;
        if (!logo || !menu) return null;

        console.log("menus: ", menus);
        return (
          <Navbar size="lg" className="overflow-hidden">
            <span className="w-full flex flex-row items-center justify-between">
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
                  "flex-1 justify-start overflow-hidden",
                  GAP_SIZE_LG
                )}
              >
                {menu.map((menu) => {
                  return (
                    <Navbar.Item href={menu.url} key={menu.id}>
                      {({ isActive, handlerActiveItem }) => menu.label}
                    </Navbar.Item>
                  );
                })}
              </Navbar.Content>
            </span>
          </Navbar>
        );
      }}
    </ValidGetContentQuery>
  );
};
export default memo(Header);
