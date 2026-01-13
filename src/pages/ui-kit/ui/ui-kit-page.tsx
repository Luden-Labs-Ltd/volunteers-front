import { FC } from 'react';
import { Header } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Textarea } from '@/shared/ui';
import { Card } from '@/shared/ui';
import { Badge } from '@/shared/ui';
import { Avatar } from '@/shared/ui';
import { IconButton } from '@/shared/ui';
import { Divider } from '@/shared/ui';

export const UIKitPage: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header title="UI Kit" />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Компоненты UI</h1>

                {/* Buttons */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Buttons</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Primary</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button variant="primary" size="sm">Small</Button>
                                    <Button variant="primary" size="md">Medium</Button>
                                    <Button variant="primary" size="lg">Large</Button>
                                    <Button variant="primary" fullWidth>Full Width</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Secondary</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button variant="secondary" size="sm">Small</Button>
                                    <Button variant="secondary" size="md">Medium</Button>
                                    <Button variant="secondary" size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Outline</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button variant="outline" size="sm">Small</Button>
                                    <Button variant="outline" size="md">Medium</Button>
                                    <Button variant="outline" size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Text</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button variant="text" size="sm">Small</Button>
                                    <Button variant="text" size="md">Medium</Button>
                                    <Button variant="text" size="lg">Large</Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">With Icons</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button
                                        variant="primary"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        }
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outline"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        }
                                        iconPosition="left"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="primary"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        }
                                        iconPosition="right"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Disabled</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Button variant="primary" disabled>Disabled</Button>
                                    <Button variant="outline" disabled>Disabled</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Inputs */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inputs</h2>
                    <Card className="p-6">
                        <div className="space-y-6">
                            <Input
                                label="Default Input"
                                placeholder="Введите текст"
                            />

                            <Input
                                label="Input with Icon"
                                placeholder="Поиск"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Input with Error"
                                placeholder="Введите телефон"
                                error="Некорректный номер телефона"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Disabled Input"
                                placeholder="Недоступно"
                                disabled
                            />
                        </div>
                    </Card>
                </section>

                {/* Textarea */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Textarea</h2>
                    <Card className="p-6">
                        <div className="space-y-6">
                            <Textarea
                                label="Default Textarea"
                                placeholder="Введите описание"
                                rows={4}
                            />

                            <Textarea
                                label="Textarea with Error"
                                placeholder="Введите текст"
                                error="Поле обязательно для заполнения"
                                rows={4}
                            />
                        </div>
                    </Card>
                </section>

                {/* Badges */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Badges</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Variants</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <Badge variant="default">Default</Badge>
                                    <Badge variant="success">Success</Badge>
                                    <Badge variant="warning">Warning</Badge>
                                    <Badge variant="error">Error</Badge>
                                    <Badge variant="info">Info</Badge>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Sizes</h3>
                                <div className="flex gap-3 flex-wrap items-center">
                                    <Badge size="sm">Small</Badge>
                                    <Badge size="md">Medium</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Avatars */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Avatars</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Sizes</h3>
                                <div className="flex gap-4 items-center">
                                    <Avatar name="Иван Иванов" size="sm" />
                                    <Avatar name="Иван Иванов" size="md" />
                                    <Avatar name="Иван Иванов" size="lg" />
                                    <Avatar name="Иван Иванов" size="xl" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">With Image</h3>
                                <div className="flex gap-4 items-center">
                                    <Avatar
                                        src="https://i.pravatar.cc/150?img=1"
                                        name="User"
                                        size="md"
                                    />
                                    <Avatar
                                        src="https://i.pravatar.cc/150?img=2"
                                        name="User"
                                        size="lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Without Name</h3>
                                <div className="flex gap-4 items-center">
                                    <Avatar size="md" />
                                    <Avatar size="lg" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Icon Buttons */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Icon Buttons</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Variants</h3>
                                <div className="flex gap-3 flex-wrap">
                                    <IconButton
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        }
                                        variant="default"
                                        aria-label="Add"
                                    />
                                    <IconButton
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        }
                                        variant="ghost"
                                        aria-label="Back"
                                    />
                                    <IconButton
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        }
                                        variant="outline"
                                        aria-label="Close"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Sizes</h3>
                                <div className="flex gap-3 flex-wrap items-center">
                                    <IconButton
                                        icon={
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        }
                                        size="sm"
                                        aria-label="Small"
                                    />
                                    <IconButton
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        }
                                        size="md"
                                        aria-label="Medium"
                                    />
                                    <IconButton
                                        icon={
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        }
                                        size="lg"
                                        aria-label="Large"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Cards */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cards</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <Card variant="default" className="p-4">
                                <h3 className="font-semibold mb-2">Default Card</h3>
                                <p className="text-gray-600">Это карточка с вариантом по умолчанию</p>
                            </Card>

                            <Card variant="outlined" className="p-4">
                                <h3 className="font-semibold mb-2">Outlined Card</h3>
                                <p className="text-gray-600">Это карточка с обводкой</p>
                            </Card>

                            <Card variant="elevated" className="p-4">
                                <h3 className="font-semibold mb-2">Elevated Card</h3>
                                <p className="text-gray-600">Это карточка с тенью</p>
                            </Card>
                        </div>
                    </Card>
                </section>

                {/* Dividers */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dividers</h2>
                    <Card className="p-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-700 mb-2">Текст сверху</p>
                                <Divider />
                                <p className="text-gray-700 mt-2">Текст снизу</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-gray-700">Слева</span>
                                <Divider orientation="vertical" className="h-8" />
                                <span className="text-gray-700">Справа</span>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Header Examples */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Header</h2>
                    <Card className="p-0 overflow-hidden">
                        <Header
                            title="Заголовок страницы"
                            backButton
                            rightActions={[
                                <IconButton
                                    key="menu"
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    }
                                    variant="ghost"
                                    aria-label="Menu"
                                />,
                            ]}
                        />
                        <div className="p-6">
                            <p className="text-gray-600">Пример использования Header компонента</p>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
};
