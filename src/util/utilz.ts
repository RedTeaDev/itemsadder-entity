import * as path from "path/posix"
import * as fs from 'fs'

export function getModelExportFolder(settings) {
    let fileName = Project.save_path.replace(/\\/g, '/').split('/').pop()
    let dirPath = Project.save_path.slice(0, -fileName.length - 1)

	dirPath = path.normalize(dirPath);

    const modelsPath = path.join(
		dirPath,
		"assets",
		settings.iaentitymodel.namespace,
		"models", 
		"entity",
        settings.iaentitymodel.projectName
	)

    // Dirty way
    fs.mkdirSync(modelsPath, { recursive: true })

    return modelsPath
}


export function getTexturesExportFolder(settings) {
    let fileName = Project.save_path.replace(/\\/g, '/').split('/').pop()
    let dirPath = Project.save_path.slice(0, -fileName.length - 1)

	dirPath = path.normalize(dirPath)

    const texturesPath = path.join(
		dirPath,
		"assets",
		settings.iaentitymodel.namespace,
		"textures", 
		"entity",
        settings.iaentitymodel.projectName
	)

    // Dirty way
    fs.mkdirSync(texturesPath, { recursive: true })

    return texturesPath
}

export function getProjectSaveFolder() {
    let fileName = Project.save_path.replace(/\\/g, '/').split('/').pop()
    let dirPath = Project.save_path.slice(0, -fileName.length)

	return dirPath = path.normalize(dirPath);
}

export function refreshIcons() {
    // If any project is opened
    if(Project) {
        for (const [groupName, group] of Object.entries(Project.groups)) {

            if(group["boneType"] === "head")
                group["icon"] = "fa fa-smile"
            else if(group["boneType"] === "leftHandPivot")
                group["icon"] = "fa fa-hand-point-left"
            else if(group["boneType"] === "rightHandPivot")
                group["icon"] = "fa fa-hand-point-right"
            else if(group["boneType"] === "mount")
                group["icon"] = "fa fa-chair"
            else if(group["boneType"] === "locator")
                group["icon"] = "fa fa-anchor"
            else if(group["boneType"] === "hitbox")
                group["icon"] = "fa fa-square-full"
            else if(group["boneType"] === "eyesHeight")
                group["icon"] = "fa fa-eye"
            else if(group.parent["name"] === undefined) // Root element
                group["icon"] = "fa fa-archive"
            else
                group["icon"] = "fa fa-bone"

            group.updateElement()
        }
    }

    //if(Project.groups.length > 0)
    //    Project.groups[0]["icon"] = "fa fa-archive" // Root element
}

export function toJson(object: any) : string {
    // @ts-ignore
    return compileJSON(object, {small: true})
}