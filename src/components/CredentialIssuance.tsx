import { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast'
import { Spinner } from '@/components/ui/spinner'

export default function CredentialIssuance({ contract, onCredentialIssued }: { contract: ethers.Contract, onCredentialIssued: () => void }) {
  const [student, setStudent] = useState('')
  const [detailsURI, setDetailsURI] = useState('')
  const [transferable, setTransferable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleIssue = async () => {
    setIsLoading(true)
    try {
      const tx = await contract.issueCredential(student, detailsURI, transferable)
      await tx.wait()
      toast({
        title: "Success",
        description: "Credential issued successfully!",
      })
      onCredentialIssued()
    } catch (error) {
      console.error('Error issuing credential:', error)
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error issuing credential. Check console for details.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Issue Credential</h2>
      <div className="space-y-2">
        <Label htmlFor="studentAddress">Student Address</Label>
        <Input
          id="studentAddress"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          placeholder="Enter student address"
        />
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="detailsURI">Details URI</Label>
        <Input
          id="detailsURI"
          value={detailsURI}
          onChange={(e) => setDetailsURI(e.target.value)}
          placeholder="Enter details URI"
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="transferable"
          checked={transferable}
          onCheckedChange={(checked) => setTransferable(checked as boolean)}
        />
        <Label htmlFor="transferable">Transferable</Label>
      </div>
      <Button onClick={handleIssue} disabled={isLoading} className="mt-2">
        {isLoading ? <><Spinner className="mr-2" /> Issuing...</> : 'Issue Credential'}
      </Button>
    </div>
  )
}

