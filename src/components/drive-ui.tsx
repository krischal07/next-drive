import { useState } from "react"
import { Folder, File, Upload, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"

type Item = {
  id: string
  name: string
  type: "file" | "folder"
  children?: Item[]
  size?: string
  modified?: string
}

const mockData: Item[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "2", name: "Resume.pdf", type: "file", size: "1.2 MB", modified: "2023-05-15" },
      { id: "3", name: "Cover Letter.docx", type: "file", size: "500 KB", modified: "2023-05-14" },
    ],
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    children: [
      { id: "5", name: "Vacation.jpg", type: "file", size: "3.5 MB", modified: "2023-05-10" },
      { id: "6", name: "Family.png", type: "file", size: "2.8 MB", modified: "2023-05-09" },
    ],
  },
  { id: "7", name: "Project.zip", type: "file", size: "10.5 MB", modified: "2023-05-08" },
]

export function DriveUI() {
  const [currentFolder, setCurrentFolder] = useState<Item[]>(mockData)
  const [breadcrumbs, setBreadcrumbs] = useState<Item[]>([])

  const handleFolderClick = (folder: Item) => {
    setCurrentFolder(folder.children || [])
    setBreadcrumbs([...breadcrumbs, folder])
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentFolder(mockData)
      setBreadcrumbs([])
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
      setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].children || [])
      setBreadcrumbs(newBreadcrumbs)
    }
  }

  const handleUpload = () => {
    alert("Upload functionality would be implemented here.")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Drive Clone</h1>
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="ghost" onClick={() => handleBreadcrumbClick(-1)}>
          My Drive
        </Button>
        {breadcrumbs.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button variant="ghost" onClick={() => handleBreadcrumbClick(index)}>
              {item.name}
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleUpload} className="mb-4">
        <Upload className="mr-2 h-4 w-4" /> Upload
      </Button>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Size</div>
          <div className="col-span-3">Last Modified</div>
        </div>
        {currentFolder.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => item.type === "folder" && handleFolderClick(item)}
          >
            <div className="col-span-6 flex items-center">
              {item.type === "folder" ? (
                <Folder className="mr-2 h-5 w-5 text-blue-400" />
              ) : (
                <File className="mr-2 h-5 w-5 text-gray-400" />
              )}
              {item.type === "file" ? (
                <a href={`#file-${item.id}`} className="text-blue-400 hover:underline">
                  {item.name}
                </a>
              ) : (
                <span>{item.name}</span>
              )}
            </div>
            <div className="col-span-3">{item.size || "-"}</div>
            <div className="col-span-3">{item.modified || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

