import { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { Spinner } from '@/components/ui/spinner'

export default function CredentialTransfer({ contract }: { contract: ethers.Contract }) {
  const [credentialId, setCredentialId] = useState('')
  const [newOwner, setNewOwner] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTransfer = async () => {
    setIsLoading(true)
    try {
      const tx = await contract.transferCredential(credentialId, newOwner)
      await tx.wait()
      toast({
        title: "Success",
        description: "Credential transferred successfully!",
      })
    } catch (error) {
      console.error('Error transferring credential:', error)
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error transferring credential. Check console for details.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Transfer Credential</h2>
      <div className="space-y-2">
        <Label htmlFor="transferCredentialId">Credential ID</Label>
        <Input
          id="transferCredentialId"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="Enter credential ID"
        />
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="newOwner">New Owner Address</Label>
        <Input
          id="newOwner"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
          placeholder="Enter new owner address"
        />
      </div>
      <Button onClick={handleTransfer} disabled={isLoading} className="mt-2">
        {isLoading ? <><Spinner className="mr-2" /> Transferring...</> : 'Transfer Credential'}
      </Button>
    </div>
  )
}

