<?php

namespace App\Http\Controllers\Admin;

use App\Enums\QuestionType;
use App\Http\Requests\QuestionRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class QuestionCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class QuestionCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Question::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/question');
        CRUD::setEntityNameStrings('question', 'questions');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */

    protected function setupShowOperation()
    {
        CRUD::column('id')->type('number');
        CRUD::column('quest_id')->type('number');
        CRUD::column('title')->type('text');
        CRUD::column('description')->type('text');
        CRUD::column('type')->type('enum');
        CRUD::column('image')->type('text');
        CRUD::column('single_answer')->type('text');
        CRUD::column('questions')->type('json');
        CRUD::column('coordinates')->type('json');
    }

    protected function setupListOperation()
    {
//        CRUD::setFromDb(); // set columns from db columns.

        CRUD::column('id')->type('number');
        CRUD::column('quest_id')->type('number');
        CRUD::column('title')->type('text');
        CRUD::column('description')->type('text');
        CRUD::column('type')->type('enum');
        CRUD::column('image')->type('text');
        CRUD::column('single_answer')->type('text');
        CRUD::column('questions')->type('json');
        CRUD::column('coordinates')->type('json');

        /**
         * Columns can be defined using the fluent syntax:
         * - CRUD::column('price')->type('number');
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(QuestionRequest::class);
//        CRUD::setFromDb(); // set fields from db columns.

        CRUD::field('quest_id')->type('number');
        CRUD::field('title')->type('text');
        CRUD::field('description')->type('text');
        CRUD::field('type')->type('enum');
        CRUD::field('image')->type('text');
        CRUD::field('single_answer')->type('text');

        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
