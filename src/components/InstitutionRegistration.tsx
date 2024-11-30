import { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { Spinner } from '@/components/ui/spinner'

export default function InstitutionRegistration({ contract }: { contract: ethers.Contract }) {
  const [name, setName] = useState('')
  const [metadataURI, setMetadataURI] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      const tx = await contract.registerInstitution(name, metadataURI)
      await tx.wait()
      toast({
        title: "Success",
        description: "Institution registered successfully!",
      })
    } catch (error) {
      console.error('Error registering institution:', error)
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error registering institution. Check console for details.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Register Institution</h2>
      <div className="space-y-2">
        <Label htmlFor="institutionName">Institution Name</Label>
        <Input
          id="institutionName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter institution name"
        />
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="metadataURI">Metadata URI</Label>
        <Input
          id="metadataURI"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
          placeholder="Enter metadata URI"
        />
      </div>
      <Button onClick={handleRegister} disabled={isLoading} className="mt-2">
        {isLoading ? <><Spinner className="mr-2" /> Registering...</> : 'Register Institution'}
      </Button>
    </div>
  )
}

