export interface NavItem {
  label: string
  href: string
}

export const homeItem: NavItem = {
  label: "Accueil",
  href: "/",
}

export const suiviItem: NavItem = {
  label: "Suivi",
  href: "/suivi",
}

export const scanItem: NavItem = {
  label: "Scan",
  href: "/scan",
}

export const ajoutItem: NavItem = {
  label: "Ajout",
  href: "/ajout",
}

export const scanUrlItem = (url: string): NavItem => {
  return {
    label: url,
    href: `/scan/${url}`,
  }
}

export const projectItem = (projectName: string): NavItem => {
  return {
    label: projectName,
    href: `/suivi/${projectName}`,
  }
}

export const pageItem = (projectName: string, pageName: string): NavItem => {
  return {
    label: pageName,
    href: `/suivi/${projectName}/${pageName}`,
  }
}

export const reportNumberItem = (
  projectName: string,
  pageName: string,
  reportNumber: number
): NavItem => {
  return {
    label: `Rapport n°${reportNumber}`,
    href: `/suivi/${projectName}/${pageName}/${reportNumber}`,
  }
}

export class NavItemsBuilder {
  private projectItems: NavItem[]

  constructor() {
    this.projectItems = []
  }

  public withHome(): NavItemsBuilder {
    if (this.projectItems.length > 0) {
      throw new Error("Home page should be the first page")
    }

    this.projectItems.push(homeItem)
    return this
  }

  public withSuivi(): NavItemsBuilder {
    if (this.projectItems.length !== 1 || this.projectItems[0].label !== "Accueil") {
      throw new Error("Suivi page should be the second page")
    }

    this.projectItems.push(suiviItem)
    return this
  }

  public withScan(): NavItemsBuilder {
    if (this.projectItems.length !== 1 || this.projectItems[0].label !== "Accueil") {
      throw new Error("Scan page should be the second page")
    }

    this.projectItems.push(scanItem)
    return this
  }

  public withAjout(): NavItemsBuilder {
    if (this.projectItems.length !== 1 || this.projectItems[0].label !== "Accueil") {
      throw new Error("Ajout page should be the second page")
    }

    this.projectItems.push(ajoutItem)
    return this
  }

  public withScanUrl(url: string): NavItemsBuilder {
    if (this.projectItems.length !== 2 || this.projectItems[1].label !== "Scan") {
      throw new Error("Scan url page should be the third page")
    }

    this.projectItems.push(scanUrlItem(url))
    return this
  }

  public withProject(projectName: string): NavItemsBuilder {
    if (this.projectItems.length !== 2 || this.projectItems[1].label !== "Suivi") {
      throw new Error("Project page should be the third page")
    }

    this.projectItems.push(projectItem(projectName))
    return this
  }

  public withPage(projectName: string, pageName: string): NavItemsBuilder {
    if (this.projectItems.length !== 3) {
      throw new Error("Page page should be the fourth page")
    }

    this.projectItems.push(pageItem(projectName, pageName))
    return this
  }

  public withReportNumber(
    projectName: string,
    pageName: string,
    reportNumber: number
  ): NavItemsBuilder {
    if (this.projectItems.length !== 4) {
      throw new Error("Report number page should be the fifth page")
    }

    this.projectItems.push(reportNumberItem(projectName, pageName, reportNumber))
    return this
  }

  public getItems(): NavItem[] {
    return this.projectItems
  }
}
