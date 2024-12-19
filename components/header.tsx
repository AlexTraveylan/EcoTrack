import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { NavItem } from "@/lib/routing-links"
import React from "react"

interface HeaderProps {
  navigation: NavItem[]
}

const Header = async ({ navigation }: HeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            {navigation.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  {index === navigation.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < navigation.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default Header
