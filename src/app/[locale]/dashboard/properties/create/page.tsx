import CreatePropertyForm from '@/features/properties/_components/create-property-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

const CreatePropertyPage = () => {
    return (
        <Card className="w-full max-w-6xl mx-auto shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">تفاصيل العقار</CardTitle>
                <CardDescription className="text-base">
                    Fill in the information below to create or edit a property listing
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreatePropertyForm />
            </CardContent>
        </Card>
    )
}

export default CreatePropertyPage