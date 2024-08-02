"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_1 = __importDefault(require("../models/event"));
const router = (0, express_1.Router)();
// CREATE: Add a new event
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = new event_1.default(req.body);
        const event = yield newEvent.save();
        res.status(201).json(event);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// READ: Get all events
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.default.find();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// READ: Get a specific event by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_1.default.findById(req.params.id);
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).json({ error: 'Event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// UPDATE: Modify an existing event
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).json({ error: 'Event not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// DELETE: Remove an event
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield event_1.default.findByIdAndDelete(req.params.id);
        if (event) {
            res.json({ message: 'Event deleted' });
        }
        else {
            res.status(404).json({ error: 'Event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
