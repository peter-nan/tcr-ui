import IPFS from 'ipfs-mini'
// import ow from 'ow'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export async function ipfsGetData(multihash) {
  // ow(multihash, ow.string)

  if (!multihash.startsWith('Qm')) {
    return new Error('multihash must start with "Qm"')
  }

  return new Promise((resolve, reject) => {
    ipfs.catJSON(multihash, (err, result) => {
      if (err) reject(new Error(err))
      resolve(result)
    })
  })
}

export async function ipfsAddObject(obj) {
  // ow(obj, ow.object)

  // TODO: verify keccak256
  const CID = await new Promise((resolve, reject) => {
    ipfs.addJSON(obj, (err, result) => {
      if (err) reject(new Error(err))
      resolve(result)
    })
  })
  console.log('CID:', CID)
  return CID
}

// mainnet: n/a, rinkeby: sunset
// export const ipfsABIsHash = 'QmRUo4m9dT1M1DQhCtXhrsct4Tta7wRaFooKG3dVTbiUUv'

// mainnet: adChain, rinkeby: sunset
export const ipfsABIsHash = 'QmXtDN1SVvRVj2AzJYzSoujhSuNe7yPUKop4fDL8EKHHFV'

export const ipfsTokensHash = 'QmRH8e8ssnj1CWVepGvAdwaADKNkEpgDU5bffTbeS6JuG9'
