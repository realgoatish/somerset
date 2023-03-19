import toJson from '../utils/toJson.js';

export interface JsonLdProps {
  type?: string;
  dataArray?: any[];
  [key: string]: any;
}

function JsonLd({
  type = 'Thing',
  keyOverride,
  scriptKey,
  dataArray,
  ...rest
}: JsonLdProps & { scriptKey: string }) {
  const JsonLdScript = () => `
<script
  type="application/ld+json"
  key="jsonld-${scriptKey}${keyOverride ? `-${keyOverride}` : ''}"
>
${toJson(
  type,
  dataArray === undefined ? { ...rest } : dataArray,
)}
</script>
`
    
  return JsonLdScript()
}

export { JsonLd }