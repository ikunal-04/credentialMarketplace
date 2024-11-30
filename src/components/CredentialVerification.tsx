import { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { Spinner } from './ui/spinner'

export default function CredentialVerification({ contract }: { contract: ethers.Contract }) {
  const [credentialId, setCredentialId] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleVerify = async () => {
    setLoading(true)
    try {
      const tx = await contract.verifyCredential(credentialId)
      await tx.wait()
      toast({
        title: "Success",
        description: "Credential verified successfully!",
      })
    } catch (error) {
      console.error('Error verifying credential:', error)
      toast({
        title: "Error",
        variant: "destructive",
        description: "Error verifying credential. Check console for details.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Verify Credential</h2>
      <div className="space-y-2">
        <Label htmlFor="credentialId">Credential ID</Label>
        <Input
          id="credentialId"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="Enter credential ID"
        />
      </div>
      <Button onClick={handleVerify} disabled={loading} className="mt-2">
        {loading ? <><Spinner className="mr-2" /> Verifying...</> : 'Verify Credential'}
      </Button>
    </div>
  )
}

