"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { projectItem } from "@/lib/routing-links"
import { Project } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"

const SearchProjects = ({ projects }: { projects: Project[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="max-w-xl">
        <Input
          type="text"
          placeholder="Rechercher un projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.name}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={projectItem(project.name).href}
                  className={buttonVariants({ variant: "link" })}
                >
                  {project.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                {project.pages.length} page{project.pages.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        ))}

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500">
            {`Aucun projet trouvé pour "${searchTerm}"`}
          </p>
        )}
      </div>
    </div>
  )
}

export default SearchProjects
