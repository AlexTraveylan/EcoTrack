const refentialBaseUrl =
  "https://github.com/France-Travail/referentiel-ecoconception/blob/master"

type blobParts = {
  path: string
  name: string
}

type prefixBpNumber = "AR" | "UI" | "ST" | "UX" | "CO"

const referentialBlobRecord: Record<prefixBpNumber, blobParts> = {
  AR: { path: "architecture", name: "architecture" },
  UI: { path: "ui", name: "user_interface" },
  ST: { path: "strategie", name: "strategie" },
  UX: { path: "ux", name: "user_experience" },
  CO: { path: "code", name: "code" },
}

export const getReferentialFranceTravailUrl = (bpNumber: string) => {
  const [prefix, number] = bpNumber.split("-")
  const blobParts = referentialBlobRecord[prefix as prefixBpNumber]

  return `${refentialBaseUrl}/${blobParts.path}/0${number}_${blobParts.name}_${bpNumber}.md`
}
